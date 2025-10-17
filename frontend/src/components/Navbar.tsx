interface NavbarProps {
  menuItems: string[];
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export default function Navbar({ menuItems, activeItem, setActiveItem }: NavbarProps) {

  return (
    <div className="flex flex-col w-75 p-2 h-fit rounded-xl mt-10 max-[768px]:ml-0 ml-10 bg-zinc-200 dark:bg-black">
      <ul className="w-full flex flex-col gap-2">
        {menuItems.map((item) => (
          <li
            key={item}
            onClick={() => setActiveItem(item)}
            className={`w-full py-4 text-center rounded-lg cursor-pointer transition-all duration-300 
                ${
                    activeItem === item
                        ? "bg-zinc-100 dark:bg-zinc-800"
                        : "bg-transparent hover:bg-zinc-300 dark:hover:bg-zinc-900"
                } ${
                    item === 'Settings'
                        ? "rounded-b-lg"
                        : ""
                }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
