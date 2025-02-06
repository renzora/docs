# Notifications plugin

## Overview
The notif plugin provides a simple notification system to display temporary messages on screen. It supports various types of notifications (info, success, warning, and danger) and automatically dismisses them after a set duration using a slide-out animation. If a notification with the same id already exists, you can choose to replace it.

## Loading plugin
To load the notif plugin from the `plugins/core` directory, use the following code:
```
plugin.load("notif", { path: "core", ext: "html" });
```

## Example Usage
``` js
// shows an informational notification
plugin.notif.show(
    'welcome_id',
    'Welcome to the game!',
    'info'
);

// shows a success notification and replaces notifications with the same id
plugin.notif.show(
    'levelUp_id',
    'Congratulations! You leveled up!',
    'success',
    true
);
```

## API Reference

### Properties
- **notificationCount**  
  *(number)*  
  The number of active notifications currently displayed.

- **activeNotifications**  
  *(Map)*  
  A map that stores currently active notifications, keyed by their unique id.

### Methods

#### notif.show(id, message, type = "info", replace = false)
- **Parameters:**
  - `id` *(string)*: A unique identifier for the notification.
  - `message` *(string)*: The text message to display.
  - `type` *(string, optional)*: The notification type. Valid values are `"info"`, `"success"`, `"warning"`, or `"danger"`. Defaults to `"info"`.
  - `replace` *(boolean, optional)*: If `true`, any existing notification with the same id will be replaced. Defaults to `false`.
- **Returns:**  
  A Promise that resolves once the notification has been dismissed.
- **Behavior:**  
  - Creates a notification container if one doesn't exist.
  - If a notification with the same id exists:
    - If `replace` is `true`, updates the notification's message and type.
    - Otherwise, resolves immediately without creating a duplicate.
  - Inserts the new notification into the container, applies appropriate Tailwind CSS classes, and sets a timer for dismissal with a slide-out animation.

#### notif.getNotificationClass(type)
- **Parameters:**
  - `type` *(string)*: The notification type.
- **Returns:**  
  A string of Tailwind CSS classes that style the notification based on its type.
- **Behavior:**  
  Returns different class strings for each notification type:
  - `"success"`: Classes for a green background.
  - `"warning"`: Classes for a yellow background.
  - `"danger"`: Classes for a red background.
  - `"info"` (default): Classes for a blue background.