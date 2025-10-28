import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Loader2, Check, AlertCircle } from "lucide-react";

interface CheckoutItem {
  planName: string;
  planPrice: number;
  quantity: number;
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const createOrderMutation = trpc.checkout.createOrder.useMutation({
    onSuccess: (data) => {
      setOrderCreated(true);
      setOrderId(data.orderId);
      setFormData({ customerName: "", customerEmail: "", customerPhone: "" });
      setItems([]);
    },
    onError: (error) => {
      alert("Error creating order: " + error.message);
    },
  });

  const plans = [
    { name: "Monthly", price: 999, duration: "1 Month" },
    { name: "Quarterly", price: 2499, duration: "3 Months" },
    { name: "Annual", price: 7999, duration: "12 Months" },
  ];

  const addItemToCart = (plan: typeof plans[0]) => {
    const existingItem = items.find(item => item.planName === plan.name);
    if (existingItem) {
      setItems(items.map(item =>
        item.planName === plan.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setItems([...items, { planName: plan.name, planPrice: plan.price, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (planName: string) => {
    setItems(items.filter(item => item.planName !== planName));
  };

  const updateQuantity = (planName: string, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromCart(planName);
    } else {
      setItems(items.map(item =>
        item.planName === planName ? { ...item, quantity } : item
      ));
    }
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.planPrice * item.quantity), 0);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Please add at least one plan to your cart");
      return;
    }

    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
      alert("Please fill in all required fields");
      return;
    }

    createOrderMutation.mutate({
      ...formData,
      items,
    });
  };

  if (orderCreated && orderId) {
    return (
      <div className="min-h-screen bg-background text-foreground py-12">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-4">
              Thank you for your order. Order ID: <span className="font-semibold text-primary">#{orderId}</span>
            </p>
            <p className="text-muted-foreground mb-6">
              We have sent a confirmation email to your inbox with payment instructions.
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Check Your Email</h3>
                  <p className="text-sm text-muted-foreground">
                    We have sent you an order confirmation and payment instructions to your email address.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Complete Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    We will contact you with a payment link. Once payment is confirmed, your activation codes will be sent immediately.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Activate & Enjoy</h3>
                  <p className="text-sm text-muted-foreground">
                    Use your activation codes to activate Lion TV on your devices and start streaming immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 justify-center">
            <Button onClick={() => setLocation("/")} variant="outline">
              Back to Home
            </Button>
            <Button onClick={() => setLocation("/")} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container max-w-6xl">
        <h1 className="text-4xl font-bold mb-12">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Select Your Plans</CardTitle>
                <CardDescription>Choose the subscription plans you want to purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <div key={plan.name} className="border border-border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{plan.duration}</p>
                      <p className="text-2xl font-bold text-primary mb-4">${(plan.price / 100).toFixed(2)}</p>
                      <Button
                        onClick={() => addItemToCart(plan)}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Please provide your contact details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      placeholder="+1 (800) 123-4567"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-600">
                      <p className="font-semibold mb-1">Cash on Delivery</p>
                      <p>After you place your order, we will contact you with a payment link. Once payment is confirmed, your activation codes will be sent immediately.</p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={items.length === 0 || createOrderMutation.isPending}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
                  >
                    {createOrderMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No items in cart</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.planName} className="border-b border-border pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold">{item.planName}</p>
                              <p className="text-sm text-muted-foreground">${(item.planPrice / 100).toFixed(2)}</p>
                            </div>
                            <button
                              onClick={() => removeItemFromCart(item.planName)}
                              className="text-xs text-red-500 hover:text-red-600"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.planName, item.quantity - 1)}
                              className="px-2 py-1 border border-border rounded text-sm hover:bg-card"
                            >
                              -
                            </button>
                            <span className="flex-1 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.planName, item.quantity + 1)}
                              className="px-2 py-1 border border-border rounded text-sm hover:bg-card"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 border-t border-border pt-4">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${(totalPrice / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-primary">${(totalPrice / 100).toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
