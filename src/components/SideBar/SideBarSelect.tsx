import { auth } from "@/firebase/config"
import { Icon, Menu, MenuButton, MenuItem, MenuList, Avatar, Button } from "@chakra-ui/react"
import { signOut } from "firebase/auth"
import { HiCog, HiHashtag, HiLogout } from "react-icons/hi"
import { useNavigate } from "react-router-dom"

import useUserStore from "@/store/userStore"

type SideBarSelectProps = {
  button: JSX.Element
}

export default function SideBarSelect({ button }: SideBarSelectProps) {
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)

  async function loginOut() {
    try {
      await signOut(auth)
      navigate("/auth")
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      <Menu>
        <MenuButton h={"56px"} w={"56px"} rounded={'3xl'} as={Button} variant={'solid'}>{button}</MenuButton>
        <MenuList>
          <MenuItem>
            <Avatar size={"xs"} name={user.username} src={user?.photoURL ?? undefined} className="mr-3" />
            <span>{user.username}</span>
          </MenuItem>
          <MenuItem>
            <Icon fontSize={"2xl"} as={HiCog} className="mr-3" />
            <span>Settings</span>
          </MenuItem>
          <MenuItem>
            <Icon fontSize={"2xl"} as={HiHashtag} className="mr-3" />
            <span>FAQ</span>
          </MenuItem>
          <MenuItem onClick={loginOut}>
            <Icon fontSize={"2xl"} as={HiLogout} className="mr-3" />
            <span>Log out</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
