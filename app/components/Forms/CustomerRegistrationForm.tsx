import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import QRCode from "qrcode"
import { useState } from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RegistrationData } from "@/app/types/forms"
import generatePdf from "@/app/hooks/generatePdf"
import insertData from "@/app/hooks/insertData"





const CustomerRegistrationForm = () => {

  const [customer, setCustomer] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    vehicleModel: "",
    manuYear: "",
    engineNumber: "",
    chasisNumber: ""
  }) 

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const error = await insertData(customer);

    if(error) {
      alert(error.message);
    }else {
      alert("successful")
    }
  }

  const handleDownload = async () => {
    await generatePdf(customer);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-10/12 m-30">
        <form onSubmit={handleSubmit}>
          <legend className="text-4xl mb-4">Customer Registration</legend>
        <Card className="mb-4 border-2 border-blue-400">
          <CardHeader>
            <CardTitle className="text-2xl">
              Customer Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="firstName">
                    First Name <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="firstName"
                    onChange={(e) => setCustomer({...customer, firstName: e.target.value})}
                    placeholder="This field is required"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">
                    Last Name <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="lastName"
                    onChange={(e) => setCustomer({...customer, lastName: e.target.value})}
                    placeholder="This field is required"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="address">
                    Address <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="address"
                    onChange={(e) => setCustomer({...customer, address: e.target.value})}
                    placeholder="This field is required"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="phoneNumber">
                    Phone Number <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="phoneNumber"
                    onChange={(e) => setCustomer({...customer, phoneNumber: e.target.value})}
                    placeholder="This field is required"
                    required
                  />
                </Field>
          </CardContent>
        </Card>
        <Card className="mb-4 border-2 border-blue-400">
          <CardHeader>
            <CardTitle className="text-2xl">
              Vehicle Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="vehicleModel">
                    Vehicle Model <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="vehicleModel"
                    onChange={(e) => setCustomer({...customer, vehicleModel: e.target.value})}
                    placeholder="This field is required"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="manuYear">
                    Manufactured Year <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input 
                    type="date"
                    id="manuYear"
                    onChange={(e) => setCustomer({...customer, manuYear: e.target.value})}
                    placeholder="This field is required"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="engineNumber">
                    Engine Number <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="engineNumber"
                    onChange={(e) => setCustomer({...customer, engineNumber: e.target.value})}
                    placeholder="This field is required"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="chasisNumber">
                    Chasis Number <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="chasisNumber"
                    onChange={(e) => setCustomer({...customer, chasisNumber: e.target.value})}
                    placeholder="This field is required"
                    required
                  />
                </Field>
          </CardContent>
        </Card>
        <Button 
          variant="outline" 
          type="submit"
          className="p-6 cursor-pointer hover:bg-blue-400 hover:text-white"
        >Submit
        </Button>
        <Button 
          variant="outline" 
          type="button"
          onClick={handleDownload}
          className="p-6 cursor-pointer hover:bg-blue-400 hover:text-white"
        >Generate PDF
        </Button>
        
      </form>
      </div>
    </div>
  )
}

export default CustomerRegistrationForm