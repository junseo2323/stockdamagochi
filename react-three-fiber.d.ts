/// <reference types="react-scripts" />
import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      directionalLight: any;
      hemisphereLight: any;
    }
  }
}
