export default {
    // Materialize Media Queries
    smallAndDown: '(max-width: 600px)',
    mediumAndUp: '(min-width: 601px)',
    mediumOnly: '(min-width: 601px) and (max-width: 992px)',
    mediumAndDown: '(max-width: 992px)',
    largeAndUp: '(min-width: 993px)',
    extraLargeAndUp: '(min-width: 1201px)',
    // Bulma Media Queries
    mobile: '(max-width: 768px)',
    tablet: '(min-width: 769px)',
    tabletOnly: '(min-width: 769px) and (max-width: 999px)',
    touch: '(max-width: 999px)',
    desktop: '(min-width: 1000px) ',
    desktopOnly: '(min-width: 1000px) and (max-width: 1191px)',
    widescreen: '(min-width: 1192px)',
    widescreenOnly: '(min-width: 1192px) and (max-width: 1383px)',
    fullhd: '(min-width: 1384px)',

    // Media Query Helpers mixin. Use globally or per component
    mixin: {
        computed: {
            isSmallAndDown: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.smallAndDown)
            },
            isMediumAndUp: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.mediumAndUp)
            },
            isMediumOnly: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.mediumOnly)
            },
            isMediumAndDown: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.mediumAndDown)
            },
            isLargeAndUp: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.largeAndUp)
            },
            isExtraLargeAndUp: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.extraLargeAndUp)
            },
            isMobile: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.mobile)
            },
            isTablet: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.tablet)
            },
            isTabletOnly: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.tabletOnly)
            },
            isTouch: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.touch)
            },
            isDesktop: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.desktop)
            },
            isDesktopOnly: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.desktopOnly)
            },
            isWidescreen: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.widescreen)
            },
            isWidescreenOnly: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.widescreenOnly)
            },
            isFullhd: function () {
                return this.$resize && this.$mq.expr(this.$mq.bands.fullhd)
            }
        }
    }
}
