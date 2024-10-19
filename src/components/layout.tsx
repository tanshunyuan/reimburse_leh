import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu"
import { Link } from "@tanstack/react-router"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const NAV_ITEMS = [{
    name: 'Expenses',
    href: '/'
  },
  {
    name: 'Reports',
    href: '/report'
  }
  ]
  return <>
    <NavigationMenu>
      <NavigationMenuList>
        {NAV_ITEMS.map((item, index) => (
          <NavigationMenuItem key={index}>
            <Link to={item.href}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
    {children}
  </>
}