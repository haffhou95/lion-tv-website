import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Check, AlertCircle, Trash2 } from "lucide-react";
import { useState } from "react";

interface CheckoutItem {
  planName: string;
  planPrice: number;
  quantity: number;
}

export default function Checkout() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plans = [
    { name: "Monthly", price: 999, duration: "1 Month" },
    { name: "Quarterly", price: 2499, duration: "3 Months" },
    { name: "6 Months", price: 4499, duration: "6 Months" },
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
      setItems([...items, {
        planName: plan.name,
        planPrice: plan.price,
        quantity: 1,
      }]);
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
  const totalPriceFormatted = (totalPrice / 100).toFixed(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
      setError("Please fill in all fields");
      return;
    }

    if (items.length === 0) {
      setError("Please add at least one plan to your cart");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create order details for email
      const orderDetails = items.map(item => 
        `${item.planName} x${item.quantity} - $${(item.planPrice * item.quantity / 100).toFixed(2)}`
      ).join("\n");

      // Submit to Netlify Forms
      const formElement = e.currentTarget;
      const formDataToSubmit = new FormData(formElement);
      
      // Add order details to form
      formDataToSubmit.append("order_details", orderDetails);
      formDataToSubmit.append("total_amount", totalPriceFormatted);
      formDataToSubmit.append("items_count", items.length.toString());

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formDataToSubmit as any).toString(),
      });

      if (response.ok) {
        setOrderSubmitted(true);
        setFormData({ customerName: "", customerEmail: "", customerPhone: "" });
        setItems([]);
      } else {
        setError("Failed to submit order. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting order:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSubmitted) {
    return (
      <div className="min-h-screen bg-background text-foreground py-20">
        <div className="container max-w-2xl">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Order Received!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your order. We've sent a confirmation email to <strong>{formData.customerEmail}</strong>
            </p>
            
            <Card className="mb-8 text-left">
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h3 className="font-semibold mb-1">Check Your Email</h3>
                    <p className="text-sm text-muted-foreground">We'll send you order confirmation and payment instructions</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h3 className="font-semibold mb-1">Make Payment</h3>
                    <p className="text-sm text-muted-foreground">We'll contact you via WhatsApp or email with payment link</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h3 className="font-semibold mb-1">Receive Activation Code</h3>
                    <p className="text-sm text-muted-foreground">Once payment is confirmed, we'll send your Lion TV activation codes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <p className="text-muted-foreground">Need immediate help?</p>
              <div className="flex gap-4 justify-center">
                <a href="https://wa.me/1234567890?text=Hi%20Lion%20TV%20Support%2C%20I%20just%20placed%20an%20order" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-500 hover:bg-green-600">
                    Chat on WhatsApp
                  </Button>
                </a>
                <a href="mailto:support@liontv.com">
                  <Button variant="outline">
                    Send Email
                  </Button>
                </a>
              </div>
            </div>

            <a href="/">
              <Button className="mt-8" variant="outline">
                Back to Home
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="container max-w-6xl">
        <h1 className="text-4xl font-bold mb-12">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Plans Selection */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Select Your Plan</h2>
            <div className="grid gap-4 mb-8">
              {plans.map((plan) => (
                <Card key={plan.name} className="hover:border-primary transition cursor-pointer">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.duration}</p>
                      <p className="text-2xl font-bold text-primary mt-2">${(plan.price / 100).toFixed(2)}</p>
                    </div>
                    <Button onClick={() => addItemToCart(plan)} className="bg-primary hover:bg-primary/90">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.planName} className="flex justify-between items-start gap-2 pb-4 border-b border-border">
                          <div className="flex-1">
                            <p className="font-semibold">{item.planName}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.planName, item.quantity - 1)}
                                className="px-2 py-1 border border-border rounded hover:bg-muted"
                              >
                                -
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.planName, item.quantity + 1)}
                                className="px-2 py-1 border border-border rounded hover:bg-muted"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${((item.planPrice * item.quantity) / 100).toFixed(2)}</p>
                            <button
                              onClick={() => removeItemFromCart(item.planName)}
                              className="text-red-500 hover:text-red-600 mt-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-primary">${totalPriceFormatted}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Checkout Form */}
        {items.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Enter your details to complete the order</CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                name="lion-tv-checkout" 
                method="POST" 
                onSubmit={handleSubmit}
                className="space-y-6"
                data-netlify="true"
              >
                <input type="hidden" name="form-name" value="lion-tv-checkout" />
                
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-500">{error}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <Input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <Input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Payment Method</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Cash on Delivery:</strong> We'll contact you with payment instructions after order confirmation.
                  </p>
                  <div className="flex items-center gap-3 p-3 border border-primary rounded-lg bg-primary/5">
                    <input type="radio" id="cod" name="paymentMethod" value="cash_on_delivery" defaultChecked />
                    <label htmlFor="cod" className="text-sm font-medium cursor-pointer">
                      Pay when we contact you
                    </label>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500 p-4 rounded-lg">
                  <p className="text-sm text-blue-900 dark:text-blue-200">
                    ✓ Your order will be sent to <strong>sales@iptvlion.shop</strong>
                    <br />
                    ✓ We'll contact you via WhatsApp or email with payment link
                    <br />
                    ✓ After payment, you'll receive your activation codes
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
                  disabled={isSubmitting || items.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Place Order - $${totalPriceFormatted}`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
