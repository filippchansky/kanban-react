import { BicepsFlexed, CalendarCheck, Eye, LayoutList } from 'lucide-react';
import React from 'react';
import { CardTitle } from './ui/card';

interface IProps {
  title: string;
}

const KanbanColumnHeader: React.FC<IProps> = ({ title }) => {
  const getIcon = () => {
    switch (title) {
      case 'Задачи':
        return <LayoutList />;
      case 'В процессе':
        return <BicepsFlexed />;
      case 'На проверке':
        return <Eye />;
      case 'Выполнено':
        return <CalendarCheck />;
    }
  };

  return (
    <>
      <CardTitle className='flex gap-3 items-center'>
        {getIcon()}
        {title}
      </CardTitle>
    </>
  );
};
export default KanbanColumnHeader;
