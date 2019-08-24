class API {
    constructor() {
        this.path = '/js';
    }

    static get($url, $parent = 'body') {
        fetch($url, {
                method: 'GET'
            })
            .then($r => $r.text())
            .catch($r => console.log('Not loaded file from CDN'))
            .then($r => {
                if ($url.indexOf('js') != -1) {
                    let $script = document.createElement('script');
                    $script.setAttribute('dynamic-script', true);
                    $script.setAttribute('async', true);
                    $script.innerHTML = $r;
                    document.querySelector($parent).appendChild($script);
                } else if ($url.indexOf('css') != -1) {
                    $css.setAttribute('dynamic-css', true);
                    $css.innerHTML = $r;
                    document.querySelector($parent).appendChild($css);
                } else {
                    console.error('Get url is not valid, please insert a url type JS or CSS');
                }
            });
    }

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
            s.src = `${this.path}/${$script}.js`;
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
