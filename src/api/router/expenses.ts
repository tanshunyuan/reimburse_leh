import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateExpenseSchema } from "~/pages/expenses/create";
import { supabase } from "~/utils/client";

export const screenKeys = {
  allExpenses: () => ["all-expenses"] as const,
  expense: (id: string) => ["expense", id] as const,
};


const useGetAllExpenses = () => {
  const queryFn = async () => {
    const result = await supabase.from('expenses').select('*')
    return result.data
  }
  return useQuery({ queryKey: screenKeys.allExpenses(), queryFn })
}

const useGetExpense = (expenseId: string) => {
  const queryFn = async () => {
    const result = await supabase.from('expenses').select('*').eq('id', expenseId).single()
    return result.data
  }
  return useQuery({ queryKey: screenKeys.expense(expenseId), queryFn })
}

const useCreateExpenseMutation = () => {
  const mutationFn = async (data: CreateExpenseSchema) => {
    const file = data.attachment[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { data: uploadResult } = await supabase.storage.from('expenses-media').upload(filePath, file)

    if (!uploadResult) throw new Error('Upload failed!')

    const uploadUrl = await supabase
      .storage
      .from('expenses-media')
      .getPublicUrl(uploadResult?.path)

    await supabase.from('expenses').insert({
      amount: data.amount,
      from: data.from,
      to: data.to,
      status: data.status,
      attachment: uploadUrl.data.publicUrl,
      exp_date: data.incurredDate.toISOString()
    })
  }

  return useMutation({ mutationFn })

}

export const expenses = {
  useGetAllExpenses,
  useGetExpense,
  useCreateExpenseMutation
}