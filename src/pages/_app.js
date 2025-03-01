import EnabledContextsAndWrappers from "@/enabledContextsAndWrappers";

export default function App({Component, pageProps}) {
  return (
      <EnabledContextsAndWrappers>
        <Component {...pageProps} />
      </EnabledContextsAndWrappers>
  );
}
