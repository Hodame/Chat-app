import {
  Avatar,
  AvatarBadge,
  CloseButton,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useOutsideClick,
} from "@chakra-ui/react";
import chats from "../data/chatTiles.json";
import { useParams } from "react-router-dom";
import { HiMicrophone, HiPaperAirplane, HiPaperClip } from "react-icons/hi";
import {
  HiBell,
  HiDotsHorizontal,
  HiSearch,
  HiTrash,
  HiUser,
} from "react-icons/hi";
import { AiOutlineClear } from "react-icons/ai";
import { useRef, useState } from "react";

export default function Chat() {
  const { chatID } = useParams();
  const chat = chats.find(
    (chat) => chat.id === (() => (chatID ? parseInt(chatID) : 0))()
  );
  return (
    <div className="flex flex-col p-4 h-full">
      <div className="flex">
        {UserChatInfo({ avatar: chat?.avatarLink, name: chat?.userName })}
      </div>
      <div className="flex-auto">d</div>
      <div>
        <ChatInput />
      </div>
    </div>
  );
}

function UserChatInfo({ avatar, name }: { avatar?: string; name?: string }) {
  const searchMessage = useRef<HTMLDivElement | null>(null);
  const [isSeached, SetIsSearched] = useState(false);

  useOutsideClick({
    ref: searchMessage,
    handler: () => SetIsSearched(false),
  });

  return (
    <div className="flex items-center px-5 justify-between w-full">
      <div className="flex items-center">
        <Avatar className="mr-3" name={name} src={avatar}>
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        <h1 className="text-lg font-semibold">{name}</h1>
      </div>
      <div className="flex gap-2">
        <div>
          {isSeached ? (
            <InputGroup ref={searchMessage}>
              <Input />
              <InputRightElement>
                <CloseButton
                  onClick={() => SetIsSearched((value) => (value = !value))}
                />
              </InputRightElement>
            </InputGroup>
          ) : (
            <IconButton
              onClick={() => SetIsSearched((value) => (value = !value))}
              variant="ghost"
              aria-label="Search for message"
              size="md"
              icon={<HiSearch />}
            />
          )}
        </div>
        <Menu direction="rtl">
          <MenuButton
            as={IconButton}
            aria-label="additional settings"
            variant="ghost"
            icon={<HiDotsHorizontal />}
          ></MenuButton>
          <MenuList>
            <MenuItem>
              <Icon w={5} h={5} className="mr-2" as={HiBell} />
              <span>Mute notifications</span>
            </MenuItem>
            <MenuItem>
              <Icon w={5} h={5} className="mr-2" as={HiUser} />
              <span>View profile</span>
            </MenuItem>
            <MenuItem>
              <Icon w={5} h={5} className="mr-2" as={AiOutlineClear} />
              <span>Clear history</span>
            </MenuItem>
            <MenuItem>
              <Icon w={5} h={5} className="mr-2" as={HiTrash} />
              <span>Delete chat</span>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

function ChatInput() {
  return (
    <div className="flex gap-2">
      <InputGroup>
        <InputLeftElement>
          <IconButton
            variant="link"
            size="md"
            aria-label="use voice button"
            icon={<HiMicrophone />}
          />
        </InputLeftElement>
        <Input size="md" placeholder="Write a message..." />
        <InputRightElement>
          <IconButton
            variant="link"
            size="md"
            aria-label="use voice button"
            icon={<HiPaperClip />}
          />
        </InputRightElement>
      </InputGroup>
      <IconButton
        className="rotate-90"
        aria-label="send message"
        icon={<HiPaperAirplane />}
      />
    </div>
  );
}
