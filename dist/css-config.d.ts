import type { ProductOrFactory } from '@cssfn/types';
import type { Cust } from '@cssfn/css-types';
import { CssValue, CssProps } from '@cssfn/cssfn';
export declare type Refs<TProps extends {}> = {
    [key in keyof TProps]: Cust.Ref;
};
export declare type Decls<TProps extends {}> = {
    [key in keyof TProps]: Cust.Decl;
};
export declare type Vals<TProps extends {}> = {
    [key in keyof TProps]: TProps[key];
};
export interface CssConfigOptions {
    /**
     * The prefix name of the generated css vars.
     */
    prefix?: string;
    /**
     * The declaring location (selector) of the generated css vars.
     */
    rule?: string;
}
export interface CssConfigSettings extends CssConfigOptions {
    /**
     * The prefix name of the generated css vars.
     */
    prefix: string;
    /**
     * The declaring location (selector) of the generated css vars.
     */
    rule: string;
    /**
     * Regenerates the css vars.
     * @param immediately `true` to refresh immediately (guaranteed has been refreshed after `refresh()` returned) -or- `false` to refresh shortly after current execution finished.
     */
    refresh: ((immediately?: boolean) => void);
}
export declare type CssConfig<TProps extends {}> = readonly [Refs<TProps>, Decls<TProps>, Vals<TProps>, CssConfigSettings];
export declare type CssConfigProps = {
    [PropName: string]: CssValue;
};
/**
 * Create, read, update, and delete configurations using *css variables* (css custom properties) stored at `:root` level (default) or at the desired `rule`.
 * The config's values can be *accessed directly* in CSS and DOM.
 *
 * Supports get property by *declaration*, eg:
 * `myButtonConfig.decls.myFavColor` => returns `'--myBtn-myFavColor'`.
 *
 * Supports get property by *reference*, eg:
 * `myButtonConfig.refs.myFavColor`  => returns `'var(--myBtn-myFavColor)'`.
 *
 * Supports get property by *value*, eg:
 * `myButtonConfig.vals.myFavColor`  => returns `'#ff0000'`.
 *
 * Supports set property, eg:
 * `myButtonConfig.vals.myFavColor = 'red'`
 *
 * Supports delete property, eg:
 * `myButtonConfig.vals.myFavColor = undefined
 */
declare const createCssConfig: <TProps extends CssConfigProps>(initialProps: ProductOrFactory<TProps>, options?: CssConfigOptions | undefined) => CssConfig<TProps>;
export { createCssConfig, createCssConfig as default };
/**
 * Includes the *general* props in the specified `cssProps`.
 * @param cssProps The collection of the css vars to be filtered.
 * @returns A `PropList` which is the copy of the `cssProps` that only having *general* props.
 */
export declare const usesGeneralProps: (cssProps: Refs<{}>) => CssProps;
/**
 * Includes the props in the specified `cssProps` starting with specified `prefix`.
 * @param cssProps The collection of the css vars to be filtered.
 * @param prefix The prefix name of the props to be *included*.
 * @param remove Remove the prefix to the returning result. The default is `true`.
 * @returns A `PropList` which is the copy of the `cssProps` that only having matching `prefix` name.
 * If `remove === true`, the returning props has been normalized (renamed), so they don't start with `prefix`.
 */
export declare const usesPrefixedProps: (cssProps: Refs<{}>, prefix: string, remove?: boolean) => CssProps;
/**
 * Includes the props in the specified `cssProps` ending with specified `suffix`.
 * @param cssProps The collection of the css vars to be filtered.
 * @param suffix The suffix name of the props to be *included*.
 * @param remove Remove the suffix to the returning result. The default is `true`.
 * @returns A `PropList` which is the copy of the `cssProps` that only having matching `suffix` name.
 * If `remove === true`, the returning props has been normalized (renamed), so they don't end with `suffix`.
 */
export declare const usesSuffixedProps: (cssProps: Refs<{}>, suffix: string, remove?: boolean) => CssProps;
/**
 * Backups the prop's values in the specified `cssProps`.
 * @param cssProps The collection of the css vars to be backed up.
 * @param backupSuff The suffix name of the backup's props.
 * @returns A `PropList` which is the copy of the `cssProps` that the prop's names was renamed with the specified `backupSuff` name.
 * eg:
 * --com-backgBak     : var(--com-backg)
 * --com-boxShadowBak : var(--com-boxShadow)
 */
export declare const backupProps: (cssProps: Refs<{}>, backupSuff?: string) => CssProps;
/**
 * Restores the prop's values in the specified `cssProps`.
 * @param cssProps The collection of the css vars to be restored.
 * @param backupSuff The suffix name of the backup's props.
 * @returns A `PropList` which is the copy of the `cssProps` that the prop's values pointed to the backup's values.
 * eg:
 * --com-backg     : var(--com-backgBak)
 * --com-boxShadow : var(--com-boxShadowBak)
 */
export declare const restoreProps: (cssProps: Refs<{}>, backupSuff?: string) => CssProps;
/**
 * Overwrites prop declarations from the specified `cssProps` (source) to the specified `cssDecls` (target).
 * @param cssDecls The collection of the css vars to be overwritten (target).
 * @param cssProps The collection of the css vars for overwritting (source).
 * @returns A `PropList` which is the copy of the `cssProps` that overwrites to the specified `cssDecls`.
 */
export declare const overwriteProps: <TProps extends {}>(cssDecls: Decls<TProps>, cssProps: Refs<{}>) => CssProps;
/**
 * Overwrites prop declarations from the specified `cssProps` (source) to the specified `cssDeclss` (targets).
 * @param cssProps The collection of the css vars for overwritting (source).
 * @param cssDeclss The list of the parent's collection css props to be overwritten (targets).
 * The order must be from the most specific parent to the least specific one.
 * @returns A `PropList` which is the copy of the `cssProps` that overwrites to the specified `cssDeclss`.
 */
export declare const overwriteParentProps: (cssProps: Refs<{}>, ...cssDeclss: Decls<{}>[]) => CssProps;
