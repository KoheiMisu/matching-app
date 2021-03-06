/**
 * API Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

export default {
  // The URL we're connecting to
  hostname: 'http://localhost:9000',

  // Map shortnames to the actual endpoints, so that we can
  // use them like so: AppAPI.ENDPOINT_NAME.METHOD()
  //  NOTE: They should start with a /
  //    eg.
  //    - AppAPI.recipes.get()
  //    - AppAPI.users.post()
  //    - AppAPI.favourites.patch()
  //    - AppAPI.blog.delete()
  endpoints: new Map([
    ['login', '/api/v1/auth/fb_login'], // If you change the key, update the reference below
    ['schedules', '/api/v1/schedules'],
    ['users', '/wp-json/wp/v2/users'],
    ['me', '/api/v1/auth/authenticated_user'],
    ['recipes', '/wp-json/wp/v2/recipes'],
    ['meals', '/wp-json/wp/v2/recipe_meal'],
  ]),

  // Which 'endpoint' key deals with our tokens?
  tokenKey: 'login',
};
