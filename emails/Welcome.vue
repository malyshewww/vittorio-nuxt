<script setup lang="ts">
import type { CSSProperties } from "vue";

defineProps({
   username: {
      type: String,
      default: "John Doe",
   },
});

const main = {
   backgroundColor: "#ffffff",
   color: "#24292e",
   fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
} as CSSProperties;

const container = {
   width: "480px",
   margin: "0 auto",
   padding: "20px 0 48px",
} as CSSProperties;

const title = {
   fontSize: "24px",
   lineHeight: 1.25,
} as CSSProperties;

const section = {
   padding: "24px",
   border: "solid 1px #dedede",
   borderRadius: "5px",
   textAlign: "center",
} as CSSProperties;

const text = {
   margin: "0 0 10px 0",
   textAlign: "left",
} as CSSProperties;

const button = {
   fontSize: "14px",
   backgroundColor: "#28a745",
   color: "#fff",
   lineHeight: 1.5,
   borderRadius: "0.5em",
   padding: "0.75em 1.5em",
} as CSSProperties;

const links = {
   textAlign: "center",
} as CSSProperties;

const link = {
   color: "#0366d6",
   fontSize: "12px",
} as CSSProperties;

const footer = {
   color: "#6a737d",
   fontSize: "12px",
   textAlign: "center",
   marginTop: "60px",
} as CSSProperties;
</script>

<template lang="pug">
	ehtml
		ehead
			epreview
				| A fine-grained personal access token has been added to your account
			ebody(:style='main')
				econtainer(:style='container')
					eimg(width='32', height='32', src='/static/github.png', alt='Github')
					etext(:style='title')
						strong @{{ username }}
						| , a personal access was created on your account.
					esection(:style='section')
						etext(:style='text')
						| Hey 
						strong {{ username }}
						| !
						etext(:style='text')
						| A fine-grained personal access token (
						elink(href='#')
							| resend
						| ) was recently added to your account.
						ebutton(href='#', :style='button')  View your token 
					etext(:style='links')
						elink(href='#', :style='link')  Your security audit log 
								&#x30FB;
						elink(href='#', :style='link')  Contact support 
					etext(:style='footer')
						| GitHub, Inc. &#x30FB;88 Colin P Kelly Jr Street &#x30FB;San Francisco, CA
						| 94107
</template>
