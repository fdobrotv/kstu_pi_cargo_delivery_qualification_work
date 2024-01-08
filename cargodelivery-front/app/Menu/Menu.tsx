"use client"

import cx from 'clsx';
import { useRef, useState } from 'react';
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderTabs.module.css';
import { useRouter } from 'next/navigation'

const user = {
  name: 'Администратор системы',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

const tabs = [
  {key: 'Orders', value: 'Заказы'},
  {key: 'WorkSlots', value: 'Рабочие Слоты'},
  {key: 'Incidents', value: 'Инцидетны'},
  {key: 'Refuels', value: 'Акты заправок'},
  {key: 'FuelStations', value: 'АЗС'},
  {key: 'Ways', value: 'Пути'},
  {key: 'Roads', value: 'Дороги'},
  {key: 'Settlements', value: 'Населённые пункты'},
  {key: 'Drivers', value: 'Водители'},
  {key: 'Users', value: 'Пользователи'},
  {key: 'Roles', value: 'Роли'},
  {key: 'Cars', value: 'Машины'},
  {key: 'CarModels', value: 'Модели машин'},
  {key: 'CarMarks', value: 'Марки машин'},
];

export function HeaderTabs() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('');

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab.key} accessKey={tab.value} > 
        {tab.value}
    </Tabs.Tab>
  )); 

  const router = useRouter()

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          {/* <MantineLogo size={28} /> */}

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconHeart
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Ordered deliveries
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Paid deliveries
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessage
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Reviews for moderation
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Account settings
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Change account
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Logout
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconPlayerPause style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Pause work
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
              >
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container size="md">
        <Tabs
          defaultValue="Orders"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
          value={activeTab} 
          onClick={(value) => {
            console.log("onClick")
            console.log("value: " + typeof value)
            console.log(value)
            let spanElement: HTMLSpanElement = value.target;
            console.log(spanElement)
            // setActiveTab(spanElement.innerText)
            // router.push('/' + spanElement.innerText)
          }}
          onTabChange={(value) => {
            console.log("onTabChange")
            console.log(value)
            router.push(`/${value}`);
            setActiveTab(value)
          }}
        >
          <Tabs.List grow>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}

export default HeaderTabs