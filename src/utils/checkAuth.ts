import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import axios from "@/core/axios";
import * as Api from "@/api";

export const checkAuth = async (ctx: GetServerSidePropsContext) => {
	const { _token } = nookies.get(ctx);

	console.log('_token', _token)

	axios.defaults.headers.Authorization = "Bearer " + _token;

	try {
		const a = await Api.auth.getMe();
		console.log('a', a)

		return {
			props: {},
		};
	} catch (err) {
		console.log('err', err)
		return {
			redirect: {
				destination: "/dashboard/auth",
				permanent: false,
			},
		};
	}
};
