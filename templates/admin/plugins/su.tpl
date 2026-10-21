<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 col-md-8 px-0 mb-4" tabindex="0">
			<div class="mb-4">
				<h5 class="fw-bold tracking-tight settings-header">{{tx("su:title")}}</h5>

				<p class="lead">{{tx("su:description")}}</p>

				<div class="mb-3">
					<label class="form-label" for="su-search">{{tx("su:search-label")}}</label>
					<input type="text" id="su-search" class="form-control" placeholder="{{tx("su:search-placeholder")}}" autocomplete="off">
				</div>

				<div id="su-results" class="mb-3"></div>

				<button id="su-switch" class="btn btn-primary" disabled>
					<i class="fa fa-sign-in-alt"></i> {{tx("su:switch-button")}}
				</button>
			</div>
		</div>
	</div>
</div>
