import { test } from '@japa/runner'

test('api routes exist', async ({ client }) => {
  // Test that API routes work (they should return 400 for missing token)
  const response = await client.get('/api')

  // Should return 400 for missing token, not 404
  response.assertStatus(400)
})
