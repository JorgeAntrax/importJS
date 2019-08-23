class API {
    static set($file, $module = 'body', $type = 'file') {
        if (Array.isArray($file)) {
            for (let $i = 0; $i < $file.length; $i++) {
                API.create($file[$i], $module, $type);
            }
        } else {
            API.create($file, $module, $type);
        }
    }

    static create($script, $module, $type) {
        let s = document.createElement("script");
        if ($type == 'file') {
            s.src = `/js/${$script}.js`;
        } else {
            s.src = $script;
        }
        s.setAttribute('dynamic-script', true);
        document.querySelector($module).appendChild(s);
    }

    static remove($file) {
        const $scripts = document.querySelectorAll('script');

        $scripts.forEach($script => {
            if (Array.isArray($file)) {
                for (let $i = 0; $i < $file.length; $i++) {
                    API.delete($file[$i], $script);
                }
            } else {
                API.delete($file, $script);
            }
        });
    }

    static delete($file, $script) {
        if ($script.getAttribute('src').indexOf($file) != -1 || $script.getAttribute('src') == $file) {
            $script.remove();
        }
    }
}
