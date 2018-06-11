// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  apiHost: 'https://transit-stage.blendtec.com',
  s3: 'https://s3-us-west-1.amazonaws.com/data.blendtec.com',
  bucket: 'https://s3-us-west-1.amazonaws.com/apps.stage.blendtec.com/warranty-claim/',
  warrantiesEndPoint: '/warranty',
  assets: 'https://s3-us-west-1.amazonaws.com/apps.stage.blendtec.com/warranty-claim/assets',
  captchaKey: '6LcWmzIUAAAAADoSNPMqAECfcdIl9Z8B4czc4MjP'
};
