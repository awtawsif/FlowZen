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
          <SidebarTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 h-auto p-0">
              <div className="flex items-center gap-2 p-2">
                <Logo className="w-6 h-6 text-primary shrink-0" />
                <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">FlowZen</span>
              </div>
            </Button>
          </SidebarTrigger>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {lists.map((list) => (
              <SidebarMenuItem key={list.id}>
                <SidebarMenuButton
                  onClick={() => onSelectList(list.id)}
                  isActive={selectedListId === list.id}
                  className="w-full justify-start"
                  tooltip={list.name}
                >
                  <ListIcon className="h-4 w-4" />
                  <span>{list.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setIsAddListOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New List
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
