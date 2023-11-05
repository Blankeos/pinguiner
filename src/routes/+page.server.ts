import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	return {
		articles: await prisma.article.findMany({
			orderBy: {
				updatedAt: "desc"
			}
		})
	};
};

export const actions: Actions = {
	createArticle: async ({ request }) => {
		const { title, content } = Object.fromEntries(await request.formData()) as {
			title: string;
			content: string;
		};

		try {
			await prisma.article.create({
				data: {
					title,
					content
				}
			});
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Could not create the article.' });
		}

		return {
			status: 201
		};
	}
};
