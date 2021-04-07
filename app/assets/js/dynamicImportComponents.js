export default function (requireComponent, Vue) {
    requireComponent.keys().forEach((fileName) => {
        const componentConfig = requireComponent(fileName);
        const componentName = fileName
            .replace(/^\.\/_/, '')
            .replace(/\.\w+$/, '')
            .split('-')
            .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
            .join('');
        Vue.component(componentName, componentConfig.default || componentConfig)
    });
};