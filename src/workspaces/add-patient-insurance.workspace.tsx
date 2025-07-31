import type { DefaultWorkspaceProps } from "@openmrs/esm-framework"
import React from "react"
import { z } from "zod"
import { Button, ButtonSet, DatePicker, DatePickerInput, RadioButton, RadioButtonGroup, Select, SelectItem, TextInput } from "@carbon/react"
import { TrashCan } from "@carbon/react/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm, Controller, Form } from "react-hook-form"


type InsuranceProvider = {
  id: string;
  name: string;
}

const insuranceProviders: Array<InsuranceProvider> = [
  {
    id: "6d28337f-32ae-445b-9425-41b94d33ae81",
    name: "ASCOMA"
  },
  {
    id: "6d28337f-32ae-445b-9425-41b94d33ae81",
    name: "Africaine des Assurances"
  },
  {
    id: "ea95fde1-7534-494b-96f8-f351cd22c2a1",
    name: "SUNU Assurance"
  },
  {
    id: "bd8345b3-c9dc-495e-8bfd-7410d39e0cc5",
    name: "La Générale des Assurances"
  }
]

const insuranceProviderConfigSchema = z.object({
  insuranceProviderId: z.string().nonempty("Please select an valid insurance provider"),
  insurancePolicyId: z.string().nonempty("Enter a valid insurance policy Id"),
  patientInsuranceNumber: z.string().nonempty("Enter a valid patient's insurance number"),
  isPrimaryProvider: z.boolean().default(false),
  coverageStartDate: z.date().optional(),
  coverageEndDate: z.date().optional()
});

const insuranceProvidersConfigSchema = z.object({
  providers: z.array(insuranceProviderConfigSchema).refine((providers) => {
    return providers.filter(config => config.isPrimaryProvider).length == 1
  }, { path: ["isPrimaryProvider"], message: "There can only be one Primary Insurance Provider" })
})

type InsuranceProvidersConfigFormData = z.infer<typeof insuranceProvidersConfigSchema>;

const AddPatientInsuranceWorkspace: React.FC<DefaultWorkspaceProps> = ({ closeWorkspace, promptBeforeClosing, closeWorkspaceWithSavedChanges }) => {

  const { register, control, setValue, formState, handleSubmit } = useForm({
    resolver: zodResolver(insuranceProvidersConfigSchema),
    defaultValues: {
      providers: [
        {
          insuranceProviderId: "",
          insurancePolicyId: "",
          patientInsuranceNumber: "",
          isPrimaryProvider: false
        }
      ]
    }
  })

  const { fields: formFields, append: appendProviderForm, remove: removeProviderForm } = useFieldArray({
    control,
    name: "providers"
  })


  function addMoreInsuranceProvider() {
    appendProviderForm({
      insurancePolicyId: "",
      insuranceProviderId: "",
      patientInsuranceNumber: "",
      isPrimaryProvider: false
    })
  }

  const removeInsuranceProvider = (index: number) => removeProviderForm(index)

  function registerProvidersConfiguration(values: InsuranceProvidersConfigFormData) {
    console.log("form values", JSON.stringify(values))
  }

  function cancelDataEntry() {
    closeWorkspace({ ignoreChanges: true })
  }

  return (
    <form onSubmit={handleSubmit(registerProvidersConfiguration)} style={{ display: 'flex', flexDirection: "column", height: "100%", width: "100%" }}>

      <div style={{ display: 'flex', flexDirection: "column", rowGap: 20, width: "100%", flex: 1, paddingRight: 10, paddingLeft: 10, paddingTop: 10 }}>

        <div style={{ display: 'flex', flexDirection: "column", rowGap: 20, width: "100%" }}>

          {formFields.map((field, index) =>

            <div key={field.id} style={{ display: "flex", flexDirection: "column", height: "auto", rowGap: 20, width: "100%", borderWidth: 1, borderStyle: 'solid', borderColor: 'gray', padding: 10, borderRadius: 5, }}>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>

                <strong>Provider #{index + 1}</strong>

                {formFields.length > 1 &&
                  <Button size="sm" kind="danger--ghost" onClick={() => removeInsuranceProvider(index)}>
                    <TrashCan />
                  </Button>
                }
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', rowGap: 3 }}>
                <Controller control={control}
                  name={`providers.${index}.insuranceProviderId`}
                  render={({ field, fieldState }) =>
                    <Select defaultValue="default"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      required id={`insuranceProviderId-${index}`}
                      name={`insuranceProviderId-${index}`}
                      labelText="Insurance Provider"
                    >
                      <SelectItem value="default" disabled text="Select Insurance Provider" />
                      {insuranceProviders.map((provider) => <SelectItem value={provider.id} text={provider.name} />)}
                    </Select>
                  }
                />
              </div>

              <div>
                <Controller
                  control={control}
                  name={`providers.${index}.insurancePolicyId`}
                  render={({ field, fieldState }) =>
                    <TextInput {...register(`providers.${index}.insurancePolicyId`)}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      required id={`insurancePolicyId-${index}`} name={`insurancePolicyId-${index}`}
                      placeholder="Enter Policy ID"
                      labelText="Policy ID" hideLabel={!fieldState.isTouched}
                    />
                  }
                />
              </div>

              <div>
                <Controller
                  control={control}
                  name={`providers.${index}.patientInsuranceNumber`}
                  render={({ field, fieldState }) =>
                    <TextInput {...register(`providers.${index}.patientInsuranceNumber`)}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      required id={`patientInsuranceNumber-${index}`} name={`patientInsuranceNumber-${index}`}
                      placeholder="Enter Insurance Number"
                      labelText="Insurance Number" hideLabel={!fieldState.isTouched}
                    />
                  }
                />
                
                <div style={{ color: 'red', fontSize: 12 }}>
                  {formState.errors?.providers && formState.errors?.providers[index] && formState.errors?.providers[index].patientInsuranceNumber?.message}</div>
              </div>

              <div>
                <Controller control={control}
                  name={`providers.${index}.isPrimaryProvider`}
                  render={({ field, fieldState }) =>
                    <RadioButtonGroup
                      onChange={(v) => setValue(`providers.${index}.isPrimaryProvider`, v === 'true')}
                      onBlur={field.onBlur}
                      defaultSelected={`no-${index}`}
                      legendText="Is this the patient's primary insurance Provider ?"
                      invalidText="Invalid selection" name={`isPrimaryProvider-${index}`}>

                      <RadioButton id={`yes-${index}`} labelText="Yes" value="true" />

                      <RadioButton id={`no-${index}`} labelText="No" value="false" />

                    </RadioButtonGroup>
                  }

                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Controller control={control}
                  name={`providers.${index}.coverageStartDate`}
                  render={({ field, fieldState }) =>
                    <DatePicker datePickerType="single" dateFormat="d/m/Y" 
                      onChange={(v) => field.onChange(v[0])}>
                      <DatePickerInput
                        id={`coverageStartDate-${index}`}
                        labelText="Coverage start date"
                        placeholder="dd/mm/yyyy"
                      />
                    </DatePicker>
                  }
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Controller control={control}
                  name={`providers.${index}.coverageEndDate`}
                  render={({ field, fieldState }) =>
                    <DatePicker datePickerType="single" dateFormat="d/m/Y"
                      onChange={(v) => field.onChange(v[0])}
                      >
                      <DatePickerInput
                        id={`coverageEndDate-${index}`}
                        labelText="Coverage end date"
                        placeholder="dd/mm/yyyy"
                      />
                    </DatePicker>
                  }
                />
              </div>
            </div>

          )}

        </div>

        <Button size="sm" onClick={addMoreInsuranceProvider} style={{ marginBottom: 30 }}>
          Add More
        </Button>

      </div>


      <ButtonSet>
        <Button type="button" onClick={cancelDataEntry} size="lg" kind="secondary">Cancel</Button>
        <Button type="submit" size="lg">Save</Button>
      </ButtonSet>
    </form>
  )
}


export default AddPatientInsuranceWorkspace;
