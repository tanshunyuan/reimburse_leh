import { Button } from "~/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Link, useNavigate } from "@tanstack/react-router"
import { MainLayout } from "~/components/layout"
import { Badge } from "~/components/ui/badge"
import { formatDate } from "~/utils/date"
import { api } from "~/api"

export const HomePage = () => {
  const navigate = useNavigate({ from: '/' })

  const {data, isLoading, isError} = api.expenses.useGetAllExpenses()

  const handleDetails = (id: string) => {
    console.log('henlo ==> ', id)
    navigate({to: `/expenses/$expenseId`, params: { expenseId: id }})
  }

  if(isLoading) return <p>Loading...</p>
  if(isError) return <p>Error!</p>

  return <MainLayout>
    <div>
      <Link to="/expenses/create">
        <Button size='sm'>
          <PlusIcon className="w-4 h-4 mr-2" /> Create
        </Button>
      </Link>
    </div>
    <div>
      {data && data.map((expense, index) => 
      <div className="flex justify-between w-3/6 px-6 py-4 border cursor-pointer rounded-2xl" key={index} onClick={() => handleDetails(expense.id)}>
        <div>
          <p className="text-lg">{expense.from} to {expense.to}</p>
          <p className="text-sm">{expense.amount}</p>
        </div>
        <div className="text-right">
          <p className="text-xs">Created {formatDate(expense.exp_date)}</p>
        <Badge variant="outline">{expense.status}</Badge>
        </div>

      </div>
    )}
    </div>
  </MainLayout>
}