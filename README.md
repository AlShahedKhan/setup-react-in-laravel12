#Setup React.js in Laravel 12

1. Run this to setup inertia server-side in laravel 12

```
composer require inertiajs/inertia-laravel
```

2. Create app.blade.php in /views

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        <!-- In this article, we are going to use JSX syntax for React components -->
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
```

3. Create its middleware via

```
php artisan inertia:middleware
```

4. Register middleware via

```
$middleware->web(append: [
            HandleInertiaRequests::class
        ]);
```

5. Give Client-side setup with npm via

```
npm install @inertiajs/inertia-react @inertiajs/react @vitejs/plugin-react react react-dom
```

6. update vite.config.js like this

```
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
```

7. Inside the “resources/js” folder, delete the app.js and create a new file named “app.jsx” with the next code inside

```
import React from 'react'
import {createRoot} from 'react-dom/client'
import {createInertiaApp } from '@inertiajs/inertia-react'
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers'

createInertiaApp({
    // Below you can see that we are going to get all React components from resources/js/Pages folder
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`,import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})
```

8. To call pages create resources/js/Pages/Index.js like this.

9. In controller call inertia like this.

```
 public function index()
    {
        // Here we provide posts from the database to prop that we created in component
        return Inertia::render('Index', [
            'posts' => Post::all()
        ]);
    }
```
