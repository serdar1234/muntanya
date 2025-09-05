import { Button, Menu, Portal } from "@chakra-ui/react";
import styles from "./Menu.module.scss";
import Link from "next/link";

export default function MenuItem() {
  return (
    <div className={styles.menu}>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="solid" size="sm">
            Menu
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="Home">
                <Link href="/" className={styles["menu-link"]}>
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item value="Kilimanjaro">
                <Link
                  className={styles["menu-link"]}
                  href="/mountains/kilimanjaro"
                >
                  Kilimanjaro
                </Link>
              </Menu.Item>
              <Menu.Item value="Everest">
                <Link href="/mountains/everest" className={styles["menu-link"]}>
                  Everest
                </Link>
              </Menu.Item>
              <Menu.Item value="open-file">Open File...</Menu.Item>
              <Menu.Item value="export">Export</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </div>
  );
}
