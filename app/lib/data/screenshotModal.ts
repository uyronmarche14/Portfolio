export interface ScreenshotModalContent {
  close: string;
  previous: string;
  next: string;
  goToImage: string;
  screenshotLabel: string;
}

export const SCREENSHOT_MODAL_CONTENT: ScreenshotModalContent = {
  close: "Close modal",
  previous: "Previous image",
  next: "Next image",
  goToImage: "Go to image",
  screenshotLabel: "screenshots"
};

export const SCREENSHOT_MODAL_ARIA_LABELS = {
  modal: (projectTitle: string) => `${projectTitle} screenshots`,
  close: "Close modal",
  previous: "Previous image",
  next: "Next image",
  goToImage: (index: number) => `Go to image ${index + 1}`
};