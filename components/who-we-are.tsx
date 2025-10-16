import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Globe, Wrench } from "lucide-react"
import Image from "next/image"

export function WhoWeAre() {
  const stats = [
    { icon: Award, label: "Years of Excellence", value: "25+" },
    { icon: Users, label: "Happy Customers", value: "500+" },
    { icon: Globe, label: "Countries Served", value: "30+" },
    { icon: Wrench, label: "Products Delivered", value: "10,000+" },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-blue-600 text-white">About Winner Machineries</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Winner Machineries, we are dedicated to providing cutting-edge machinery designed to meet the diverse needs of industries.
              </p>
              <p className="text-gray-600 mb-6">
               <h3 className="py-3">Our Vision</h3>
               We envision a future where businesses across all industries thrive with the power of reliable, <br/>
                efficient, and innovative machinery. Our commitment to excellence drives us to continuously enhance the 
                <br/>
                design, performance, and sustainability of our products.

                <br/>

                 <h3 className="py-3">Our Mission</h3>
                  Our mission is to provide the best machinery solutions that empower businesses, enhance productivity, <br/>
                  and ensure safety. Through constant research, development, and a customer-centric approach, we aim to be <br/>
                  the top choice for industrial machinery worldwide.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-4">
                  <CardContent className="p-0">
                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Image
                  src="https://www.winnermachineries.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FfbImage1.0c08b378.jpg&w=750&q=75"
                  alt="Manufacturing facility"
                  width={300}
                  height={250}
                  className="rounded-lg shadow-lg object-cover"
                />
                <Image
                  src="https://www.winnermachineries.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FfbImage2.31876315.jpg&w=750&q=75"
                  alt="Quality control"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
              <div className="space-y-4 mt-8">
                <Image
                  src="https://www.winnermachineries.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FfbImage3.f35b9e9c.jpg&w=750&q=75"
                  alt="Engineering team"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-lg object-cover"
                />
                <Image
                  src="https://www.winnermachineries.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FfbImage4.d7c94bf6.jpg&w=750&q=75"
                  alt="Modern machinery"
                  width={300}
                  height={250}
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
