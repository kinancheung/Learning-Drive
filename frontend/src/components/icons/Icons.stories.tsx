import { Box, SvgIcon, SvgIconProps } from '@mui/material';
import { ComponentStory, Meta, Story } from '@storybook/react';

import ArrowLeftIcon from './ArrowLeftIcon';
import ChatIcon from './ChatIcon';
import CopyClipboardIcon from './CopyClipboardIcon';
import EditIcon from './EditIcon';
import ExitIcon from './ExitIcon';
import FacebookIcon from './FacebookIcon';
import FilterIcon from './FilterIcon';
import FlameIcon from './Flame';
import FlameOutIcon from './FlameOut';
import GithubIcon from './GithubIcon';
import GlobeIcon from './GlobeIcon';
import GoogleIcon from './GoogleIcon';
import HelpIcon from './HelpIcon';
import ListIcon from './ListIcon';
import LoadingIcon from './LoadingIcon';
import LogoIcon from './LogoIcon';
import PlusIcon from './PlusIcon';
import SadBoxIcon from './SadBoxIcon';
import SaveIcon from './SaveIcon';
import SearchIcon from './SearchIcon';
import SendIcon from './SendIcon';
import ShareIcon from './ShareIcon';
import SignOutIcon from './SignOutIcon';
import UserIcon from './UserIcon';
import WriteIcon from './WriteIcon';

export default {
  title: 'Components/Icons',
  component: SvgIcon,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'warning', 'error', 'info', 'success'],
      control: { type: 'select' },
    },
  },
  parameters: {
    layout: 'centered',
  },
} as Meta;

const ICONS = [
  ArrowLeftIcon,
  ChatIcon,
  CopyClipboardIcon,
  EditIcon,
  ExitIcon,
  FacebookIcon,
  FilterIcon,
  FlameIcon,
  FlameOutIcon,
  GithubIcon,
  GlobeIcon,
  GoogleIcon,
  HelpIcon,
  ListIcon,
  LoadingIcon,
  LogoIcon,
  PlusIcon,
  SadBoxIcon,
  SaveIcon,
  SearchIcon,
  SendIcon,
  ShareIcon,
  SignOutIcon,
  UserIcon,
  WriteIcon,
];

export const Default: Story<SvgIconProps> = (args) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      '& *': { display: 'block' },
      gap: '8px',
    }}
  >
    {ICONS.map((Icon, i) => (
      <Icon {...args} key={i} />
    ))}
  </Box>
);

export const ArrowLeft: ComponentStory<typeof ArrowLeftIcon> = (args) => (
  <ArrowLeftIcon {...args} />
);

export const Chat: ComponentStory<typeof ChatIcon> = (args) => <ChatIcon {...args} />;

export const CopyClipboard: ComponentStory<typeof CopyClipboardIcon> = (args) => (
  <CopyClipboardIcon {...args} />
);

export const Edit: ComponentStory<typeof EditIcon> = (args) => <EditIcon {...args} />;

export const Exit: ComponentStory<typeof ExitIcon> = (args) => <ExitIcon {...args} />;

export const Facebook: ComponentStory<typeof FacebookIcon> = (args) => <FacebookIcon {...args} />;

export const Filter: ComponentStory<typeof FilterIcon> = (args) => <FilterIcon {...args} />;

export const Flame: ComponentStory<typeof FlameIcon> = (args) => <FlameIcon {...args} />;

export const FlameOut: ComponentStory<typeof FlameOutIcon> = (args) => <FlameOutIcon {...args} />;

export const Github: ComponentStory<typeof GithubIcon> = (args) => <GithubIcon {...args} />;

export const Globe: ComponentStory<typeof GlobeIcon> = (args) => <GlobeIcon {...args} />;

export const Google: ComponentStory<typeof GoogleIcon> = (args) => <GoogleIcon {...args} />;

export const Help: ComponentStory<typeof HelpIcon> = (args) => <HelpIcon {...args} />;

export const List: ComponentStory<typeof ListIcon> = (args) => <ListIcon {...args} />;

export const Loading: ComponentStory<typeof LoadingIcon> = (args) => <LoadingIcon {...args} />;

export const Logo: ComponentStory<typeof LogoIcon> = (args) => <LogoIcon {...args} />;

export const Plus: ComponentStory<typeof PlusIcon> = (args) => <PlusIcon {...args} />;

export const SadBox: ComponentStory<typeof SadBoxIcon> = (args) => <SadBoxIcon {...args} />;

export const Save: ComponentStory<typeof SaveIcon> = (args) => <SaveIcon {...args} />;

export const Search: ComponentStory<typeof SearchIcon> = (args) => <SearchIcon {...args} />;

export const Send: ComponentStory<typeof SendIcon> = (args) => <SendIcon {...args} />;

export const Share: ComponentStory<typeof ShareIcon> = (args) => <ShareIcon {...args} />;

export const SignOut: ComponentStory<typeof SignOutIcon> = (args) => <SignOutIcon {...args} />;

export const User: ComponentStory<typeof UserIcon> = (args) => <UserIcon {...args} />;

export const Write: ComponentStory<typeof WriteIcon> = (args) => <WriteIcon {...args} />;
