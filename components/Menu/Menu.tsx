import { Button, Menu, Portal } from "@chakra-ui/react";
import styles from "./Menu.module.scss";

export default function MenuItem() {
  return (
    <div className={styles.menu}>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="solid" size="sm">
            Open
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="new-txt">New Text File</Menu.Item>
              <Menu.Item value="new-file">New File...</Menu.Item>
              <Menu.Item value="new-win">New Window</Menu.Item>
              <Menu.Item value="open-file">Open File...</Menu.Item>
              <Menu.Item value="export">Export</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </div>
  );
}
