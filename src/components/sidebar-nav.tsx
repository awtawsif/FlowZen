"use client";

import { useState } from 'react';
import { List as ListIcon, Plus } from 'lucide-react';

import type { List } from '@/lib/types';
import { AddListDialog } from '@/components/add-list-dialog';
import { Logo } from '@/components/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { ThemeSwitcher } from './theme-switcher';

type SidebarNavProps = {
  lists: List[];
  selectedListId: string | null;
  onSelectList: (id: string) => void;
  onAddList: (list: Omit<List, 'id' | 'tasks'>) => void;
};

export function SidebarNav({ lists, selectedListId, onSelectList, onAddList }: SidebarNavProps) {
  const [isAddListOpen, setIsAddListOpen] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
            <div className="relative flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
                <Logo className="w-6 h-6 text-primary shrink-0" />
                <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">FlowZen</span>
                <SidebarTrigger className="absolute inset-0 z-10 size-full bg-transparent p-0 hover:bg-transparent [&>svg]:hidden" />
            </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {lists.map((list) => (
              <SidebarMenuItem key={list.id}>
                <SidebarMenuButton
                  onClick={() => onSelectList(list.id)}
                  isActive={selectedListId === list.id}
                  className="w-full justify-start group-data-[collapsible=icon]:justify-center"
                  tooltip={list.name}
                >
                  <ListIcon className="h-4 w-4" />
                  <span className="group-data-[collapsible=icon]:hidden">{list.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center" onClick={() => setIsAddListOpen(true)}>
            <Plus className="h-4 w-4 mr-2 group-data-[collapsible=icon]:mr-0" />
            <span className="group-data-[collapsible=icon]:hidden">New List</span>
          </Button>
          <SidebarSeparator />
          <ThemeSwitcher />
        </SidebarFooter>
      </Sidebar>
      <AddListDialog
        isOpen={isAddListOpen}
        onOpenChange={setIsAddListOpen}
        onAddList={onAddList}
      />
    </>
  );
}
