"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import group from '../assets/icons/group.svg'
import home from '../assets/icons/Home.svg'
import payments from '../assets/icons/payments.svg'
import widgets from '../assets/icons/widgets.svg'
import charts from '../assets/icons/insert_chart.svg'
import mainstackLogo from '../assets/icons/mainstack-logo.svg'
import notification from '../assets/icons/notifications.svg'
import chat from '../assets/icons/chat.svg'
import menu from '../assets/icons/menu.svg'
import { fetchUser } from '../services/api'
export default function Navigation() {
  const pathname = usePathname()
  const navItems = [
    {
      name: 'Home',
      path: '/home',
      icon: home
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: charts
    },
    {
      name: 'Revenue',
      path: '/revenue',
      icon: payments
    },
    {
      name: 'CRM',
      path: '/',
      icon: group
    },
    {
      name: 'Apps',
      path: '/apps',
      icon: widgets
    }
  ]

  const [user, setUser] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  const getUser = async () => {
    setIsLoading(true)
    try {
      const user = await fetchUser()
      setUser(user?.data)
    } catch (err) {
      console.log('err', err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <nav className="nav__bar">
      <div className="">
        <Image src={mainstackLogo}
          width={30}
          height={30}
          alt="mainstack logo" />
      </div>
      <ul className="nav__links">
        {navItems?.map(navItem =>
          <li
            data-testid="link-list"
            key={navItem.path}
            className={pathname === navItem.path ? "active__link" : ""}>
            <Link href={navItem.path}>
              <Image src={navItem.icon}
                className="nav__icons"
                width={22}
                height={22}
                alt={navItem.path} />
              {navItem.name}
            </Link>
          </li>)}
      </ul>
      <div className="nav_auth__links">
        <button>
          <Image src={notification}
            width={22}
            height={22}
            alt="notification" />
        </button>
        <button>
          <Image src={chat}
            width={22}
            height={22}
            alt="message" />
        </button>
        <button>
          <div className="text-white rounded-full font-semibold w-8 h-8 flex items-center justify-center nav__user">
            {user?.first_name?.at(0)}{user?.last_name?.at(0)}
          </div>
          <Image src={menu}
            width={22}
            height={22}
            alt="menu" />
        </button>
      </div>
    </nav>
  );
}