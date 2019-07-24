class API {
    static set($file) {
        if (Array.isArray($file)) {
            for (let $i = 0; $i < $file.length; $i++) {
                API.create($file[$i]);
            }
        } else {
            API.create($file);
        }
    }

    static create($script) {
        let s = document.createElement("script");
        s.src = `/js/${$script}.js`;
        s.setAttribute('dynamic-script', true);
        document.querySelector("body").appendChild(s);
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
