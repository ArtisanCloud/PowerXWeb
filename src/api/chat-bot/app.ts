import { PowerModel } from '@/api';

export interface App extends PowerModel {
  tenant_uuid?: string;
  created_user_by?: string;
  updated_user_by?: string;
  app_model_config_uuid?: string;
  workflow_uuid?: string;
  name?: string;
  status?: string;
  type?: string;
  mode?: string;
  description?: string;
  persona?: string;
  avatar_url?: string;
  is_public?: boolean;
}
