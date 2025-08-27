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
              <Badge className="mb-4 bg-blue-600">About Winner Machineries</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6">
                Winner Machineries has been at the forefront of industrial innovation for over two decades. We
                specialize in providing cutting-edge machinery solutions that drive efficiency, productivity, and growth
                for businesses across various industries.
              </p>
              <p className="text-gray-600 mb-6">
                Our commitment to excellence, combined with our deep understanding of industrial needs, has made us a
                trusted partner for companies worldwide. From small-scale operations to large manufacturing facilities,
                we deliver solutions that exceed expectations.
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
                  src="/placeholder.svg?height=250&width=300"
                  alt="Manufacturing facility"
                  width={300}
                  height={250}
                  className="rounded-lg shadow-lg"
                />
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Quality control"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Engineering team"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-lg"
                />
                <Image
                  src="/placeholder.svg?height=250&width=300"
                  alt="Modern machinery"
                  width={300}
                  height={250}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
