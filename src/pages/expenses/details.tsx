import { Link, useParams } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { supabase } from "~/utils/client"

export const ExpenseDetailsPage = () => {
  const [expense, setExpense] = useState(null)
  const { expenseId } = useParams({ strict: false })
  const getExpense = async () => {
    const results = await supabase.from('expenses').select('*').eq('id', expenseId)
    setExpense(results.data[0])
  }
  useEffect(() => {
    getExpense()
  })
  if(expense === null) return <p>Expense not found!</p>
  return <div>
 <Link to="/">
        <Button size='sm'>
          Back
        </Button>
      </Link>    <div className="grid grid-cols-2 gap-2">
      <div>
        <img src={expense.attachment} alt="attachment" />
      </div>
      <div>
        <p className="text-lg">{expense.from} to {expense.to}</p>
        <p className="text-sm">{expense.amount}</p>
        <p className="text-xs">Created {expense.exp_date}</p>
        <p className="text-xs">Status: {expense.status}</p>
      </div>
    </div>
  </div>
}