import { 
  Shield, 
  Truck, 
  Headphones, 
  DollarSign, 
  Star, 
  RefreshCw, 
  Award, 
  Clock,
  CheckCircle 
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "All products come with manufacturer warranty and our 30-day money-back guarantee. Shop with confidence knowing you're protected.",
      color: "bg-blue-500",
      highlights: ["Manufacturer Warranty", "30-Day Money Back", "Certified Products"]
    },
    {
      icon: DollarSign,
      title: "Best Prices",
      description: "We offer competitive pricing on all products with regular discounts and special offers. Get premium quality at affordable prices.",
      color: "bg-green-500",
      highlights: ["Price Match Guarantee", "Regular Discounts", "Bulk Order Savings"]
    },
    {
      icon: Truck,
      title: "Fast & Free Shipping",
      description: "Free shipping on orders over $50. Express delivery options available. Track your package every step of the way.",
      color: "bg-orange-500",
      highlights: ["Free Shipping $50+", "Express Delivery", "Real-time Tracking"]
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description: "Our expert support team is available around the clock via phone, email, and live chat to help with any questions or concerns.",
      color: "bg-purple-500",
      highlights: ["24/7 Availability", "Multiple Channels", "Expert Support"]
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "We partner with top brands and manufacturers to ensure every product meets our high standards for quality and performance.",
      color: "bg-yellow-500",
      highlights: ["Top Brands", "Quality Testing", "Performance Verified"]
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Hassle-free return process with prepaid shipping labels. Not satisfied? Return within 30 days for a full refund.",
      color: "bg-red-500",
      highlights: ["Hassle-free Process", "Prepaid Labels", "Full Refunds"]
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Winner of multiple customer service awards and recognized as a top electronics retailer by industry publications.",
      color: "bg-indigo-500",
      highlights: ["Award Winner", "Industry Leader", "Customer Rated"]
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Orders placed before 2 PM are processed the same day. Get your products faster with our streamlined fulfillment process.",
      color: "bg-teal-500",
      highlights: ["Same Day Processing", "Quick Fulfillment", "Efficient Operations"]
    }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      rating: 5,
      comment: "Amazing service! My laptop arrived in perfect condition and the customer support was incredibly helpful.",
      product: "MacBook Pro"
    },
    {
      name: "Sarah Williams",
      rating: 5,
      comment: "Best prices I found anywhere online. The shipping was super fast and the product quality is excellent.",
      product: "iPhone 15"
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Had an issue with my order and their support team resolved it immediately. Will definitely shop here again!",
      product: "Gaming Headset"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4">Your Trusted Electronics Partner</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Why Choose ElectroStore?
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            Discover the advantages that make us the preferred choice for thousands of satisfied customers worldwide.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              We go above and beyond to provide an exceptional shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="size-6 text-white" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {feature.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">
                            <CheckCircle className="size-3" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-muted-foreground">
              Numbers that speak for themselves
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.8%</div>
              <div className="text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Real reviews from real customers who chose ElectroStore
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">Purchased: {testimonial.product}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Our Guarantees to You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="size-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-lg font-semibold mb-2">Quality Promise</h3>
              <p className="opacity-90">Every product is tested and verified before shipping</p>
            </div>
            <div className="text-center">
              <RefreshCw className="size-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="opacity-90">30-day hassle-free return policy on all items</p>
            </div>
            <div className="text-center">
              <Headphones className="size-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="opacity-90">Technical support available whenever you need it</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}