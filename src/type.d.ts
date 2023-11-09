import * as THREE from "three";
import Prefab from "@/Assets/Prefab.ts";
import { Group, Scene, Vector3 } from "three";
import SceneObject from "@/Assets/SceneObjects/SceneObject.ts";

interface ISceneObjectsArgs {
  position?: Vector3;
  velocity?: Vector3;
  controller?: Group;
  intersections?: any;
}
interface ISceneObjects {
  object: Group;
  scene: Scene;
  args: ISceneObjectsArgs;
}

type Asset = {
  asset: string;
  sceneObjectType: typeof SceneObject;
  hasAnimation?: boolean;
};
