"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Truck, MapPin, CreditCard } from "lucide-react";
import { toast } from "sonner";

// Reduced list of countries
const countries = [
  { value: "US", label: "United States" },
  { value: "IN", label: "India" },
  { value: "GB", label: "United Kingdom" },
];

// Form validation schema using Zod
const shippingFormSchema = z.object({
  address: z
    .string()
    .min(5, {
      message: "Address must be at least 5 characters long.",
    })
    .max(100, {
      message: "Address must not exceed 100 characters.",
    }),
  city: z
    .string()
    .min(2, {
      message: "City must be at least 2 characters long.",
    })
    .max(50, {
      message: "City must not exceed 50 characters.",
    }),
  state: z
    .string()
    .min(2, {
      message: "State must be at least 2 characters long.",
    })
    .max(50, {
      message: "State must not exceed 50 characters.",
    }),
  country: z.string({
    error: "Please select a country.",
  }),
  pinCode: z
    .string()
    .min(3, {
      message: "Pin code must be at least 3 characters long.",
    })
    .max(10, {
      message: "Pin code must not exceed 10 characters.",
    })
    .regex(/^[A-Za-z0-9\s-]+$/, {
      message:
        "Pin code can only contain letters, numbers, spaces, and hyphens.",
    }),
});

type ShippingFormValues = z.infer<typeof shippingFormSchema>;

const Shipping = () => {
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
  });

  const onSubmit = (data: ShippingFormValues) => {
    console.log("[v0] Shipping form submitted:", data);
    toast("Shipping Address Saved!",{
      description: "Your shipping information has been successfully saved.",
    });

    // Here you would typically send the data to your backend
    // Example: await saveShippingAddress(data)
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Truck className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Shipping Information
        </h1>
        <p className="text-muted-foreground">
          Please provide your shipping address details for delivery
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Delivery Address
          </CardTitle>
          <CardDescription>
            Enter your complete shipping address information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Address Field */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full street address"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormDescription>
                      Include apartment, suite, or building number if applicable
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City and State Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter city name"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter state or province"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Country and Pin Code Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 w-full">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {countries.map((country) => (
                            <SelectItem
                              key={country.value}
                              value={country.value}
                            >
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pinCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pin Code/Zip Code *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter pin/zip code"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Saving Address...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Save Shipping Address
                    </>
                  )}
                </Button>
              </div>

              {/* Additional Info */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  <span className="font-medium">Secure Delivery:</span> Your
                  shipping information is encrypted and secure. We'll use this
                  address for all future deliveries unless you specify
                  otherwise.
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Shipping;
