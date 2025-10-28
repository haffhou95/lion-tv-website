import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createOrder, createOrderItem, getOrderById, getOrderItemsByOrderId, updateOrderPaymentLink } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  checkout: router({
    createOrder: publicProcedure
      .input(z.object({
        customerName: z.string().min(1, "Name is required"),
        customerEmail: z.string().email("Invalid email"),
        customerPhone: z.string().min(1, "Phone is required"),
        items: z.array(z.object({
          planName: z.string(),
          planPrice: z.number(),
          quantity: z.number().default(1),
        })),
      }))
      .mutation(async ({ input }) => {
        try {
          const totalPrice = input.items.reduce((sum, item) => sum + (item.planPrice * item.quantity), 0);

          const orderResult = await createOrder({
            customerName: input.customerName,
            customerEmail: input.customerEmail,
            customerPhone: input.customerPhone,
            totalPrice,
            status: "pending",
            paymentMethod: "cash_on_delivery",
          });

          const orderId = (orderResult as any).insertId || (orderResult as any)[0]?.id;

          for (const item of input.items) {
            await createOrderItem({
              orderId,
              planName: item.planName,
              planPrice: item.planPrice,
              quantity: item.quantity,
            });
          }

          await notifyOwner({
            title: "New Order Received",
            content: `New order from ${input.customerName} (${input.customerEmail}) for ${input.items.map(i => i.planName).join(", ")}. Total: $${(totalPrice / 100).toFixed(2)}`,
          });

          return {
            success: true,
            orderId,
            totalPrice,
            message: "Order created successfully. You will receive an email with payment instructions.",
          };
        } catch (error) {
          console.error("Error creating order:", error);
          throw new Error("Failed to create order");
        }
      }),

    getOrder: publicProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ input }) => {
        const order = await getOrderById(input.orderId);
        if (!order) {
          throw new Error("Order not found");
        }

        const items = await getOrderItemsByOrderId(input.orderId);
        return { order, items };
      }),

    updatePaymentLink: protectedProcedure
      .input(z.object({ orderId: z.number(), paymentLink: z.string().url() }))
      .mutation(async ({ input, ctx }) => {
        const order = await getOrderById(input.orderId);
        if (!order) {
          throw new Error("Order not found");
        }

        await updateOrderPaymentLink(input.orderId, input.paymentLink);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
