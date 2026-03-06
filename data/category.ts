import { Shirt, Laptop, Armchair, Book, Watch } from "lucide-react";

 const categories = [
    {
      name: 'Clothing',
      items: '156 items',
      icon: Shirt,
      bgColor: 'bg-rose-100 dark:bg-rose-900/30',
      textColor: 'text-rose-500'
    },
    {
      name: 'Electronics',
      items: '89 items',
      icon: Laptop,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-500'
    },
    {
      name: 'Furniture',
      items: '43 items',
      icon: Armchair,
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      textColor: 'text-orange-500'
    },
    {
      name: 'Books',
      items: '112 items',
      icon: Book,
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      textColor: 'text-purple-500'
    },
    {
      name: 'Accessories',
      items: '91 items',
      icon: Watch,
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      textColor: 'text-amber-500'
    }
  ];

  export default categories;