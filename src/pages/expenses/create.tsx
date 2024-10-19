import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select"
import { format } from "date-fns"
import { ArrowLeftIcon, CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { cn } from "~/lib/utils"
import { Calendar } from "~/components/ui/calendar"
import { Link } from "@tanstack/react-router"
import { supabase } from "~/utils/client"
import { useState } from "react"
const formSchema = z.object({
  incurredDate: z.date(),
  from: z.string().min(3),
  to: z.string().min(3),
  amount: z.coerce.number(),
  status: z.enum(['backlog', 'processing', 'reimbursed']),
  attachment: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, 'File is required.')
})
type FormSchema = z.infer<typeof formSchema>

export const CreateExpensePage = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incurredDate: new Date(),
      from: '',
      to: '',
      amount: 0,
      status: 'backlog',
      attachment: undefined
    }
  })
  const attachmentRef = form.register("attachment");
  const [uploading, setUploading] = useState(false)

  const handleAttachmentUpload = async (item: FileList) => {
    try {
      setUploading(true)

      const file = item[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError, data } = await supabase.storage.from('expenses-media').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      return data.fullPath

    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: FormSchema) => {
    console.log(data.attachment)

    try {
      const imagePath = await handleAttachmentUpload(data.attachment)
      const uploadUrl = await supabase
        .storage
        .from('expenses-media')
        .getPublicUrl(imagePath)

      await supabase.from('expenses').insert({
        amount: data.amount,
        from: data.from,
        to: data.to,
        status: data.status,
        attachment: uploadUrl.data.publicUrl,
        exp_date: data.incurredDate
      })

    } catch (error) {

      console.log(error)
    }

  }

  return <>
    <div className="flex items-center mb-2">
      <Link to="/">
        <Button size='sm' variant='ghost'><ArrowLeftIcon className="w-5 h-5" /></Button>
      </Link>
      <h3 className="text-xl">Fill in your expenses</h3>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
        <FormField
          control={form.control}
          name="incurredDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Incurred Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <Input placeholder="Home" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Input placeholder="A destination" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="reimbursed">Reimbursed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attachment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachment</FormLabel>
              <FormControl>
                <Input type="file" {...attachmentRef} onChange={(event) => {
                  field.onChange(event.target?.files?.[0] ?? undefined);
                }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  </>
}