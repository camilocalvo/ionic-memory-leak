## Ionic Memory Leak Reproduction Repository

### Current Behavior
The user logs in and loads an image from the camera / camera roll / file system (using @capacitor/Camera), after which it is added into the useState. This prompts an <img> HTML element to appear with the new image as its src. When the user logs out, the image and its base64 string are still present in memory, attached to a chain of detached HTML nodes and elements.

![detached-html-elements](https://github.com/camilocalvo/ionic-memory-leak/assets/21162110/92c6b4eb-2084-4a3f-af56-ba60454062a9)

### Expected Behavior
Upon logging out, the image should be destroyed, as there should be nothing referencing it in memory. Resources (heap memory and DOM nodes) should not leak when moving to a different location in the router.

### Steps to Reproduce

1. When the application loads, open the memory devtool on Chrome.
2. Press the "LOG IN" button.
3. You will reach the dashboard and be prompted to upload an image from your filesystem. Upload an image that is large enough to be easily visible in memory.
4. Take a heap snapshot in the memory devtool. You will find the image under (string) as a base64 string. Go to the retainers section for the image, and note that it is attached to an <img> HTML element.
5. Press the "LOG OUT" button.
6. Take another heap snapshot. The image and the <img> element will still be present, but will now be attached to some detached HTML nodes.
7. Repeat steps 2-6 if you wish, and note the memory increasing linearly.

### Code Reproduction URL
https://frabjous-clafoutis-e0eb41.netlify.app/
