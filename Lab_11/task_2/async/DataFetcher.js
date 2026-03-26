export class DataFetcher {
  constructor(httpClient) {
    this.client = httpClient;
  }

  async fetchUser(userId) {
    return this.client.get(`/users/${userId}`);
  }

  async fetchUserPosts(userId) {
    return this.client.get(`/users/${userId}/posts`);
  }

  async fetchUserFollowers(userId) {
    return this.client.get(`/users/${userId}/followers`);
  }

  async fetchUserWithDetails(userId) {
    try {
      const [user, posts, followers] = await Promise.all([
        this.fetchUser(userId),
        this.fetchUserPosts(userId),
        this.fetchUserFollowers(userId),
      ]);
      return {
        user,
        posts,
        followers,
        fetchedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }

  async fetchMultipleUsers(userIds) {
    const results = await Promise.allSettled(
      userIds.map((id) => this.fetchUser(id))
    );
    const successful = results
      .filter((r) => r.status === 'fulfilled')
      .map((r) => r.value);
    const failed = results
      .filter((r) => r.status === 'rejected')
      .map((r) => ({
        error: r.reason.message,
        id: r.reason.config?.url,
      }));
    return {
      users: successful,
      failed,
      totalRequested: userIds.length,
      totalSuccessful: successful.length,
      totalFailed: failed.length,
    };
  }

  async fetchWithFallback(primaryUrl, fallbackUrls) {
    const urls = [primaryUrl, ...fallbackUrls];
    const results = await Promise.allSettled(
      urls.map((url) => this.client.get(url))
    );
    const successful = results.find((r) => r.status === 'fulfilled');
    if (successful) {
      return { data: successful.value, source: 'primary' };
    }
    throw new Error('All fetch attempts failed');
  }
}

export async function fetchFirstSuccess(promises, timeoutMs = 5000) {
  return Promise.race([
    Promise.allSettled(promises).then((results) => {
      const successful = results.find((r) => r.status === 'fulfilled');
      if (successful) return successful.value;
      throw new Error('All promises failed');
    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeoutMs)
    ),
  ]);
}