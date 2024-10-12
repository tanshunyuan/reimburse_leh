import { Button } from "~/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"

export const HomePage = () => {
  return <div>
    <div>
      <Link to="/expenses/create">
        <Button size='sm'>
          <PlusIcon className="mr-2 h-4 w-4" /> Create
        </Button>
      </Link>
    </div>
  </div>
}