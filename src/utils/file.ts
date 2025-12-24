import { get, set } from "idb-keyval";

import type { MusicItem } from "@/utils/browse";

export const saveLocalFolderToHandler = async (): Promise<MusicItem[]> => {
  if (!("showDirectoryPicker" in window)) {
    alert("您的瀏覽器不支援此功能，請使用支援 File System Access API 的瀏覽器（如 Chrome、Edge 等）");
    return [] as MusicItem[];
  }

  try {
    const folderHandler: FileSystemDirectoryHandle = await window.showDirectoryPicker();
    const mp3Handler: FileSystemFileHandle[] = [];

    await scanFolder(folderHandler, mp3Handler);
    await set("local-music-library", mp3Handler);

    const musicItems = await Promise.all(
      mp3Handler.map(async (handle) => ({
        name: handle.name,
        image: "",
        artist: "本地音樂",
        type: "local",
        url: URL.createObjectURL(await handle.getFile()),
      })),
    );
    return musicItems;
  } catch (error) {
    console.error("Error saving local folder:", error);
    return [] as MusicItem[];
  }
};

export const loadLocalMusicFromHandler = async (): Promise<MusicItem[]> => {
  try {
    const mp3Handler: FileSystemFileHandle[] | undefined = await get("local-music-library");
    if (!mp3Handler) return [];

    const musicItems = await Promise.all(
      mp3Handler.map(async (handle) => ({
        name: handle.name,
        image: "",
        artist: "本地音樂",
        type: "local",
        url: "",
        method: async () => await handle.getFile(),
      })),
    );
    return musicItems;
  } catch (error) {
    console.error("Error loading local music from handler:", error);
    return [];
  }
};

const scanFolder = async (folderHandler: FileSystemDirectoryHandle, mp3Handler: FileSystemFileHandle[]): Promise<void> => {
  for await (const entry of folderHandler.values()) {
    if (entry.kind === "file" && entry.name.endsWith(".mp3")) {
      mp3Handler.push(entry);
      continue;
    }
    if (entry.kind === "directory") {
      await scanFolder(entry, mp3Handler);
    }
  }
};
