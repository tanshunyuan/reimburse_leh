import { Link, useParams } from "@tanstack/react-router"
import { api } from "~/api"
import { Button } from "~/components/ui/button"

export const ExpenseDetailsPage = () => {
  const { expenseId } = useParams({ strict: false })
  const { data, isLoading, isError } = api.expenses.useGetExpense(expenseId)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error!</p>

  if(!data) return <p>Expense not found!</p>
  return <div>
    <Link to="/">
      <Button size='sm'>
        Back
      </Button>
    </Link>    
    <div className="grid grid-cols-2 gap-2">
      <div>
        <img src={data.attachment!} alt="attachment" />
      </div>
      <div>
        <p className="text-lg">{data.from} to {data.to}</p>
        <p className="text-sm">{data.amount}</p>
        <p className="text-xs">Created {data.exp_date}</p>
        <p className="text-xs">Status: {data.status}</p>
      </div>
    </div>
  </div>
}