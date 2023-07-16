import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  theme,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";
import { HiSearch } from "react-icons/hi";

type SearchBarProps = {
  hintText?: string;
  onSearch?: ChangeEventHandler;
};

export default function SearchBar({ hintText, onSearch }: SearchBarProps) {
  return (
    <div className="bg-surface rounded-3xl relative text-light">
      <Icon
        className="absolute left-4 top-[50%] -translate-y-[50%]"
        w={7}
        h={7}
        as={HiSearch}
      />
      <input
        onChange={onSearch}
        className="bg-transparent w-full px-3 py-5 pl-14 text-white rounded-3xl"
        placeholder={hintText}
        type="text"
      />
    </div>
  );
}
