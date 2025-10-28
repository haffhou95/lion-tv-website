import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Smartphone, Tv, HelpCircle, Mail, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Lion TV and how does it work?",
      answer: "Lion TV is a premium IPTV streaming service that provides access to thousands of live TV channels, movies, and on-demand content. Simply purchase an activation code, install the compatible app, and activate your account to start streaming instantly."
    },
    {
      question: "How do I activate my Lion TV code?",
      answer: "After purchasing your activation code, download the Lion TV app on your device, open it, and enter your unique activation code in the settings. Your account will be activated immediately, and you can start streaming right away."
    },
    {
      question: "What devices are compatible with Lion TV?",
      answer: "Lion TV is compatible with Smart TVs (Samsung, LG, Sony), Android devices, iOS devices, Amazon Fire Stick, Android TV boxes, and more. Check our device compatibility section for a complete list."
    },
    {
      question: "Can I use one activation code on multiple devices?",
      answer: "Yes, most Lion TV plans allow simultaneous streaming on multiple devices. The exact number depends on your subscription plan. Check your plan details for specific device limits."
    },
    {
      question: "What if my activation code doesn't work?",
      answer: "If you experience issues, ensure you've entered the code correctly and that your device has an active internet connection. For persistent issues, contact our support team via email or phone for immediate assistance."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 7-day money-back guarantee if you're not satisfied with the service. Contact our support team within 7 days of purchase to request a refund."
    },
    {
      question: "Is Lion TV legal?",
      answer: "Lion TV operates in compliance with all applicable laws and regulations. We provide legitimate streaming services with proper licensing agreements."
    },
    {
      question: "How often is the channel list updated?",
      answer: "Our channel list is updated regularly to ensure you have access to the latest content. Updates are automatic and require no action from you."
    }
  ];

  const devices = [
    { name: "Smart TV", icon: Tv },
    { name: "Android", icon: Smartphone },
    { name: "iOS", icon: Smartphone },
    { name: "Fire Stick", icon: Zap },
    { name: "Android TV Box", icon: Tv },
    { name: "Tablet", icon: Smartphone }
  ];

  const plans = [
    {
      name: "Monthly",
      price: "$9.99",
      duration: "1 Month",
      features: ["Full HD Streaming", "1000+ Channels", "24/7 Support", "7-Day Money Back"]
    },
    {
      name: "Quarterly",
      price: "$24.99",
      duration: "3 Months",
      features: ["Full HD Streaming", "1000+ Channels", "24/7 Support", "7-Day Money Back", "Save 17%"],
      popular: true
    },
    {
      name: "Annual",
      price: "$79.99",
      duration: "12 Months",
      features: ["Full HD Streaming", "1000+ Channels", "24/7 Support", "7-Day Money Back", "Save 33%"]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Floating Contact Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/1234567890?text=Hi%20Lion%20TV%20Support%2C%20I%20need%20help%20with%20my%20activation%20code"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        
        {/* Email Button */}
        <a
          href="mailto:support@liontv.com?subject=Lion%20TV%20Support%20Request"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          title="Email us"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-primary">Lion TV</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm hover:text-primary transition">How It Works</a>
            <a href="#pricing" className="text-sm hover:text-primary transition">Pricing</a>
            <a href="#devices" className="text-sm hover:text-primary transition">Devices</a>
            <a href="#faq" className="text-sm hover:text-primary transition">FAQ</a>
            <a href="#contact" className="text-sm hover:text-primary transition">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Code Now
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-background via-background to-card overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Get Your <span className="text-primary">Lion TV Activation Code</span> Today
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Unlock access to 1000+ live TV channels, movies, and on-demand content. Stream on all your devices with crystal-clear quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/checkout">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base">
                  Buy Activation Code
                </Button>
              </a>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-base">
                Learn More
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <a
                href="https://wa.me/1234567890?text=Hi%20Lion%20TV%20Support%2C%20I%20need%20help%20with%20my%20activation%20code"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              <a
                href="mailto:support@liontv.com?subject=Lion%20TV%20Support%20Request"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              ✓ 7-Day Money Back Guarantee • ✓ 24/7 Customer Support • ✓ Instant Activation
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Activate Lion TV</h2>
            <p className="text-lg text-muted-foreground">Get started in just 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Purchase Code",
                description: "Choose your subscription plan and purchase your Lion TV activation code securely."
              },
              {
                step: 2,
                title: "Install App",
                description: "Download the Lion TV app on your device from the app store or official website."
              },
              {
                step: 3,
                title: "Activate & Stream",
                description: "Enter your activation code in the app and start streaming 1000+ channels instantly."
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-background rounded-lg p-8 border border-border hover:border-primary transition">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {item.step < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-primary -translate-y-1/2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Choose the plan that works best for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, idx) => (
              <Card key={idx} className={`relative ${plan.popular ? 'border-primary md:scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-primary text-primary hover:bg-primary/10'}`}>
                    Get {plan.name} Code
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Device Compatibility */}
      <section id="devices" className="py-20 md:py-28 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compatible Devices</h2>
            <p className="text-lg text-muted-foreground">Stream on all your favorite devices</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {devices.map((device, idx) => {
              const Icon = device.icon;
              return (
                <div key={idx} className="bg-background rounded-lg p-6 border border-border hover:border-primary transition text-center">
                  <Icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="font-semibold text-sm">{device.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-28 bg-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about Lion TV activation code</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/50 transition"
                >
                  <span className="font-semibold text-left flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-primary transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-card/30 border-t border-border text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-card/50">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help?</h2>
            <p className="text-lg text-muted-foreground">Get in touch with our support team</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-lg p-8 border border-border text-center hover:border-primary transition">
              <MessageCircle className="w-10 h-10 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">WhatsApp Support</h3>
              <p className="text-muted-foreground mb-4">+1 (800) 123-4567</p>
              <a
                href="https://wa.me/1234567890?text=Hi%20Lion%20TV%20Support%2C%20I%20need%20help%20with%20my%20activation%20code"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
              >
                Chat Now
              </a>
            </div>
            <div className="bg-background rounded-lg p-8 border border-border text-center hover:border-primary transition">
              <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-4">support@liontv.com</p>
              <a
                href="mailto:support@liontv.com?subject=Lion%20TV%20Support%20Request"
                className="inline-block mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <span className="font-bold text-primary">Lion TV</span>
              </div>
              <p className="text-sm text-muted-foreground">Premium IPTV streaming service with 1000+ channels.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#how-it-works" className="hover:text-primary transition">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-primary transition">Pricing</a></li>
                <li><a href="#devices" className="hover:text-primary transition">Devices</a></li>
                <li><a href="#faq" className="hover:text-primary transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#contact" className="hover:text-primary transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition">Troubleshooting</a></li>
                <li><a href="#" className="hover:text-primary transition">Activation Guide</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Lion TV. All rights reserved. | Premium IPTV Activation Code Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
