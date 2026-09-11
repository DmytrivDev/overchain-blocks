@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title = $attributes['title'] ?? '';
	$subtitle = $attributes['subtitle'] ?? '';
	$privacy = $attributes['privacy'] ?? '';
	$imageUrl = $attributes['imageUrl'] ?? '';
	$sectionClass = 'infrastruct mailing ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	$labelEmail = function_exists( 'pll__' ) ? pll__( 'Enter Your Email' ) : __( 'Enter Your Email', 'overchain' );
	$labelSubmit = function_exists( 'pll__' ) ? pll__( 'Subscribe' ) : __( 'Subscribe', 'overchain' );

	$successTitle = $attributes['successTitle'] ?? '';
	$successDesc = $attributes['successDesc'] ?? '';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="infrastruct__container">
		<div class="infrastruct__wrap">

			<div class="infrastruct__bg no-select" aria-hidden="true">
				<img src="{{ esc_url( get_template_directory_uri() . '/assets/img/decor/infrastruct_bg_1.jpg' ) }}"
					alt="">
			</div>

			<div class="infrastruct__body section-body">

				@if ( ! empty( $imageUrl ) )
					<div class="infrastruct__img mouse-prllx">
						<img src="{{ esc_url( $imageUrl ) }}" alt="">
					</div>
				@endif

				<div class="infrastruct__content">
					@if ( ! empty( $title ) )
						<h2 class="tl3">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					@if ( ! empty( $subtitle ) )
						<div class="txt2 medium">
							<p>{!! wp_kses_post( $subtitle ) !!}</p>
						</div>
					@endif

					<form data-hsfc-id="Form"
						id="5852dbf1-c6b7-4634-8edb-bfaef17563c7-d354b5e2-6fec-45f4-9293-3a232e7b235b" method="POST"
						accept-charset="UTF-8" enctype="multipart/form-data" novalidate="" lang="EN"
						aria-label="HubSpot Form" data-render-version="0"
						data-instance-id="5852dbf1-c6b7-4634-8edb-bfaef17563c7"
						data-form-id="d354b5e2-6fec-45f4-9293-3a232e7b235b" data-portal-id="144737242" data-hublet="eu1"
						action="https://forms-eu1.hsforms.com/submissions/v3/public/submit/formsnext/multipart/144737242/d354b5e2-6fec-45f4-9293-3a232e7b235b"
						target="submission_handler_5852dbf1-c6b7-4634-8edb-bfaef17563c7-d354b5e2-6fec-45f4-9293-3a232e7b235b"
						class="base-form form-intouch submitForm hubSpotForm form__content hs-form-private hsForm_45818287-de80-4423-86c5-faeaaec174ed hs-form-45818287-de80-4423-86c5-faeaaec174ed hs-form-45818287-de80-4423-86c5-faeaaec174ed_20bb11ad-6121-4405-87b3-bf0999944443 hs-form stacked hs-custom-style"
						data-success-modal="md-success"
						data-success-title="{{ esc_attr( $successTitle ) }}"
						data-success-desc="{{ esc_attr( $successDesc ) }}">
						@php echo wp_nonce_field( 'overchain_subscribe', 'overchain_subscribe_nonce', true, false ); @endphp
						<label class="form-infrastruct__label" for="mailing">
							{{ esc_html( $labelEmail ) }}
						</label>
						<div class="form-infrastruct__layout">
							<span class="form-infrastruct__input">
								<input type="email" id="mailing" name="0-1/email" placeholder="Example@company.com"
									data-required>
							</span>
							<button type="submit" class="form-infrastruct__submit btn-def">
								{{ esc_html( $labelSubmit ) }}
							</button>
						</div>

						<input type="hidden" name="hs_context"
							value="{&quot;source&quot;:&quot;forms-embed-static&quot;,&quot;sourceName&quot;:&quot;forms-embed&quot;,&quot;sourceVersion&quot;:&quot;1.0&quot;,&quot;sourceVersionMajor&quot;:&quot;1&quot;,&quot;sourceVersionMinor&quot;:&quot;0&quot;,&quot;referrer&quot;:&quot;https://overchainnew/&quot;,&quot;userAgent&quot;:&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36&quot;,&quot;urlParams&quot;:{&quot;_hsPortalId&quot;:&quot;144737242&quot;,&quot;_hsFormId&quot;:&quot;d354b5e2-6fec-45f4-9293-3a232e7b235b&quot;,&quot;_hsIsQa&quot;:&quot;false&quot;,&quot;_hsHublet&quot;:&quot;eu1&quot;,&quot;_hsDisableScriptloader&quot;:&quot;true&quot;,&quot;_hsDisableRedirect&quot;:&quot;true&quot;,&quot;_hsInstanceId&quot;:&quot;5852dbf1-c6b7-4634-8edb-bfaef17563c7&quot;,&quot;_hsUtk&quot;:&quot;1992f4a8b86728b3ee6b07d8d3a4e887&quot;},&quot;isHubSpotCmsGeneratedPage&quot;:false,&quot;isCMSEditor&quot;:false,&quot;locale&quot;:&quot;en&quot;,&quot;formDefinitionUpdatedAt&quot;:1782408823674,&quot;pageUrl&quot;:&quot;https://overchainnew/insights/&quot;,&quot;pageTitle&quot;:&quot;Insights – Overchain&quot;,&quot;pageId&quot;:null,&quot;allPageIds&quot;:{},&quot;hutk&quot;:&quot;1992f4a8b86728b3ee6b07d8d3a4e887&quot;,&quot;fieldValues&quot;:{},&quot;emailResubscribeStatus&quot;:&quot;NOT_APPLICABLE&quot;,&quot;captchaStatus&quot;:&quot;NOT_APPLICABLE&quot;,&quot;renderedFieldsIds&quot;:[&quot;0-1/email&quot;],&quot;shortenedFieldsIds&quot;:[],&quot;boolCheckBoxFields&quot;:&quot;&quot;,&quot;__INTERNAL_PERFORMANCE__&quot;:{&quot;formDomInteractive&quot;:1242.5,&quot;formPageLoad&quot;:1277.1,&quot;formRendered&quot;:1682.2,&quot;formReady&quot;:1743.6,&quot;formContainerScriptLoadingStart&quot;:385.8,&quot;formContainerScriptLoadingEnd&quot;:450.2,&quot;formScriptLoadingStart&quot;:385,&quot;formScriptLoadingEnd&quot;:1212.5,&quot;formDefinitionLoadStart&quot;:501.6,&quot;formDefinitionLoadEnd&quot;:1643,&quot;effectiveNetworkType&quot;:&quot;4g&quot;,&quot;inferredFormType&quot;:&quot;framed&quot;,&quot;parentDomInteractive&quot;:1851,&quot;parentPageLoad&quot;:3581.4,&quot;parentFrameMounted&quot;:2300.6},&quot;formId&quot;:&quot;d354b5e2-6fec-45f4-9293-3a232e7b235b&quot;,&quot;portalId&quot;:144737242,&quot;region&quot;:&quot;eu1&quot;,&quot;env&quot;:&quot;prod&quot;}">
						<iframe
							name="submission_handler_5852dbf1-c6b7-4634-8edb-bfaef17563c7-d354b5e2-6fec-45f4-9293-3a232e7b235b"
							title="submission frame" style="display: none;"></iframe>
					</form>
				</div>

				@if ( ! empty( $privacy ) )
					<div class="infrastruct__bottom">
						<div class="text">
							<p>{!! wp_kses_post( $privacy ) !!}</p>
						</div>
					</div>
				@endif

			</div>
		</div>
	</div>
</section>